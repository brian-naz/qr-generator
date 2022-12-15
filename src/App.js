import React, { useState } from "react";
import QRCode from "qrcode";
import { Button, TextField, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import "./App.css";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");

  const generate = () => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "000000",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);

        console.log(url);
        setQr(url);
      }
    );
  };

  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Typography variant="h3">QR Generator</Typography>
        <TextField
          label="Link"
          variant="filled"
          size="small"
          placeholder="e.g. https://google.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={generate}>
          Generate
        </Button>

        {qr && (
          <>
            <img src={qr} />
            <Button variant="contained" color="success" href={qr} download="qr.png">
              Download
            </Button>
          </>
        )}
      </ThemeProvider>
    </div>
  );
}

function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;
