import { makeStyles } from '@material-ui/core';

export const useStylesNewForm = makeStyles((theme) => ({
    catCol: {
      margin: "auto",
      background: theme.palette.grey[200],
      backgroundColor: 'transparent',
    },
    letra: {
      color: "#000",
      fontFamily: "Segoe UI Emoji",
      marginTop: '2%'
    },
    emoji: {
      height: theme.spacing(6),
      width: theme.spacing(6),
      marginLeft: '2%',
      marginTop: '2%'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
  }));