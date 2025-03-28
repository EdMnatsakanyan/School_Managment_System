import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export function HomePage() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/classes')
    }, [])
    return <>
        <Typography variant="h1" color="initial">Main Page</Typography>
    </>
}

