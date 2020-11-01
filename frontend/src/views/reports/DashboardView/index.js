import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
// import LatestProducts from './LatestProducts';
import CropMaturity from './CropMaturity';
import TasksProgress from './TasksProgress';
import ProfitMade from './ProfitMade';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import CropDetails from './CropDetails';
import Initiate from './Initiate';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));



const Dashboard = () => {
  const classes = useStyles();
  const [userData, setUserData] = React.useState([]);
  const [predictedData, setPredictedData] = React.useState([]);

  // console.log(predictedData);

  useEffect(() => {
    Axios.post('https://ieee-hackathon-api.herokuapp.com/users/')
         .then((data) => {
            setUserData(data.data);
         })
  }, [])
  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <ProfitMade />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <CropMaturity userData={userData}/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice userData={userData}/>
          </Grid>

          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Initiate userData={userData} setPredictedData={setPredictedData}/>
          </Grid>
          
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders predictedData={predictedData}/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <CropDetails predictedData={predictedData[0]}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
