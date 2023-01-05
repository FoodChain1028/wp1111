import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { sha256 } from 'crypto-hash';

const Login = ({ me, setName, handleSignIn, onLogin, onSignUp, password, setPassword }) => {
    return (
        <>
            <Input.Search
                size="large"
                style={{ width: 300, marginTop: 50 }}
                prefix={<UserOutlined />}
                placeholder="Enter your name"
                value={me}
                onChange={(e) => setName(e.target.value)}
                enterButton="Sign in"
                onSearch={
                    (me) => handleSignIn(me)
                }
            />
            {/* <Input.Password
                size="large"
                style={{ width: 300, margin: 20 }}
                placeholder="Enter your password"
                onChange={async (e) =>{
                    setPassword(await sha256(e.target.value));
                }}
            /> */}
            {/* <Button
                type="primary"
                size="large"
                style={{ width: 100, margin: 2 }}
                onClick={() => onLogin(me, password)}
            >Sign in
            </Button> */}
            {/* <Button
                type="primary"
                size='large'
                style={{ width: 100, margin: 2 }}
                onClick={() => onSignUp(me, password)}
            >Sign up
            </Button> */}
        </>
    );
}

export default Login;