import { Button, Snackbar } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react'

const CopyButton = ({code}) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(code)
    }
    
    return (
        <>
          <IconButton onClick={handleClick}>
            <ContentCopyIcon/>
          </IconButton>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

export default CopyButton;