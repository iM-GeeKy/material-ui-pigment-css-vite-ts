import { useEffect, useState } from "react";
import CheckCircle from '@mui/icons-material/CheckCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material-pigment-css/Container";
import Stack from "@mui/material-pigment-css/Stack";

function App(): JSX.Element | null {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isResetPasswordProcessing, setIsResetPasswordProcessing] =
    useState(false);
  const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasVerifyEmailError, setHasVerifyEmailError] = useState(false);
  const [hasRecoverEmailError, setHasRecoverEmailError] = useState(false);

  useEffect(() => {
    async function initialize() {
      setTimeout(() => {
        setIsPageLoading(false);
      }, 3000);
    }
    initialize();
  }, []);

  const renderContent = (): JSX.Element | null => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    let content = (
      <>
        <Stack direction="row" sx={styles.headerStack}>
          <Typography variant="h6">Test</Typography>
        </Stack>
        <Typography variant="body2" sx={styles.paddingBottomOne}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        </Typography>
      </>
    );

    if (!hasVerifyEmailError && !hasRecoverEmailError) {
      switch (mode) {
        case "resetPassword":
          content = (
            <>
              <Stack direction="row" sx={styles.headerStack}>
                {isPasswordResetSuccess ? (
                  <CheckCircle sx={styles.marginRightOne} color="success" />
                ) : null}
                <Typography variant="h6">Password Reset</Typography>
              </Stack>
              <Typography variant="body2" sx={styles.paddingBottomOne}>
                {isPasswordResetSuccess
                  ? "Your password has been successfully changed. Close this window and return to the app."
                  : null}
              </Typography>
              {isPasswordResetSuccess ? null : (
                <FormControl sx={styles.passwordResetForm} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    New password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    autoFocus
                    onChange={(event) =>
                      setNewPassword(event.target.value.trim())
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          id="togglePasswordVisibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{ maxLength: 50 }}
                    label="New password"
                  />
                  <FormHelperText>
                    Must be at least 12 characters.
                  </FormHelperText>
                  <LoadingButton
                    variant="contained"
                    sx={styles.marginTopTwo}
                    loading={isResetPasswordProcessing}
                    disabled={newPassword.trim().length < 12}
                  >
                    Save
                  </LoadingButton>
                </FormControl>
              )}
            </>
          );
          break;
        case "recoverEmail":
          content = (
            <>
              <Stack direction="row" sx={styles.headerStack}>
                <CheckCircle sx={styles.marginRightOne} color="success" />
                <Typography variant="h6">Email Recovered</Typography>
              </Stack>
              <Typography variant="body2" sx={styles.paddingBottomOne}>
                Your email has been successfully recovered. If you suspect your
                account was comprised, we've sent a password reset link to your
                email.
              </Typography>
            </>
          );
          break;
        case "verifyEmail":
          content = (
            <>
              <Stack direction="row" sx={styles.headerStack}>
                <CheckCircle sx={styles.marginRightOne} color="success" />
                <Typography variant="h6">Email Verified</Typography>
              </Stack>
              <Typography variant="body2" sx={styles.paddingBottomOne}>
                Your email has been successfully verified. Close this window and
                return to the app.
              </Typography>
            </>
          );
          break;
        default:
          break;
      }
    }

    return content;
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={styles.paperContainer}>
        <Paper elevation={3} sx={styles.paper}>
          {isPageLoading ? (
            <div sx={styles.progressContainer}>
              <CircularProgress />
            </div>
          ) : (
            renderContent()
          )}
        </Paper>
      </Container>
    </>
  );
}

const styles = {
  headerStack: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  marginBottomThree: {
    mb: 3,
  },
  marginRightOne: {
    mr: 1,
  },
  marginTopOne: {
    mt: 1,
  },
  marginTopTwo: {
    mt: 2,
  },
  paddingBottomOne: {
    pb: 1,
  },
  paper: {
    margin: "auto",
    maxWidth: 450,
    textAlign: "center",
    p: 3,
  },
  paperContainer: {
    height: "90vh",
    position: "relative",
    display: "flex",
  },
  passwordResetForm: {
    display: "flex",
    flex: 1,
  },
  progressContainer: {
    p: 2,
    display: "flex",
    justifyContent: "center",
  },
};

export default App;
