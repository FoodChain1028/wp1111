import * as fs from 'fs'
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws'
import { createSchema, createYoga, createPubSub } from 'graphql-yoga';
import { useServer } from 'graphql-ws/lib/use/ws'
// resolvers
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
// import Subscription from "./resolvers/Subscription.js";
// db
import { UserModel, QuestionModel, QuestionDataModel } from './models/Model.js'
// for deploy
import apiRoute from './api';
import express from 'express';
import cors from 'cors';
import path from "path";

const pubSub = createPubSub();
const __dirname = path.resolve();
const app = express();

app.use(cors());
app.use("/api", apiRoute);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend","build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
});

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema.graphql',
      'utf-8'
    ),
    resolvers: {
      Query,
      Mutation,
    },
  }),
  context: {
    pubSub,
    UserModel,
    QuestionModel,
    QuestionDataModel
  },
  graphiql: {
    subscriptionsProtocol: 'WS'
  }
})

const httpServer = createServer(yoga)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: yoga.graphqlEndpoint,
})

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload
        })

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe
        }
      }

      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    },
  },
  wsServer,
)

export default httpServer;
