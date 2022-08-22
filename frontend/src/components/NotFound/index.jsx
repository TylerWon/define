import {
  Link,
  Stack,
  Typography
} from "@mui/material";

// The Not Found page
export default function NotFound(props) {
  return (
    <Stack
      spacing={4}
      alignItems="center"
      justifyContent="center"
      sx={{ 
        width: "100vw", 
        height: "100vh"
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h1">Error (4xx)</Typography>
        <Typography>We can't find the page you're looking for</Typography>
      </Stack>
      <Stack
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <Typography>Here are a few links that may be helpful:</Typography>
        <Link href="/" underline="hover">
          <Typography>Home</Typography>
        </Link>
        <Link href="/login" underline="hover">
          <Typography>Login</Typography>
        </Link>
        <Link href="/register" underline="hover">
          <Typography>Sign up</Typography>
        </Link>
      </Stack>
    </Stack>
  )
}
