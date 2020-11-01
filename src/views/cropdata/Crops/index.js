import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
// import data from './data';
import Axios from 'axios';
// import axios from 'axios';
// import Tables from './Tables';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Crops = () => {

  // const [loading, setLoading] = useState(true);

  // const cropdata = axios.get('https://ieee-hackathon-api.herokuapp.com/crops/').then(() => { setLoading(false); }).data;
  const classes = useStyles();
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    Axios.get('https://ieee-hackathon-api.herokuapp.com/crops/')
         .then((data) => {
           setCrops(data.data);
         });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Crops"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results crops={crops}/>
          {/* <Tables crops={cropdata}/> */}
        </Box>
      </Container>
    </Page>
  );
};

export default Crops;
