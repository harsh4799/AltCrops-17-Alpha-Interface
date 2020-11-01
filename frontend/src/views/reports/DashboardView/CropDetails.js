import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  makeStyles,
  LinearProgress,
  Grid,
  Container,
  Button
} from '@material-ui/core';

// import { MonetizationOnOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const TrafficByDevice = ({ predictedData, className, ...rest }) => {
  const classes = useStyles();
  // const cropname = predictedData !== undefined ? predictedData[0].crop_list : `Loading`;
  // console.log(predictedData)
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Selected Recommendation Details" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Container style={{
                  marginLeft: '0px',
                  paddingLeft: '0px'
                }}  >
            <Grid container>
              <Grid
                item
                sm={6}
                lg={6}
                xs={6}
                md={6}
              >
                <Typography variant="h2">
                  {`WHEAT`}
                </Typography>            
                <Typography color="textSecondary" gutterBottom variant="h6"> {`PLOT : 1`} </Typography>
              </Grid>
              <Grid
                item
                sm={6}
                lg={6}
                xs={6}
                md={6}
              >
                <Button variant="contained" color="primary" style={{
                  height: '3rem',
                  marginLeft: '5rem'
                }}>
                  Details
                </Button>
              </Grid>
            </Grid>
          </Container>
         
            <Divider/>
            <Box mt={2}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
              style={{fontSize: "18px"}}
            >
              <Grid
                item
                lg={6}
                md={6}
                xs={6}
              >Expected Profits</Grid><p style={{
                color: "#222"
            }}>₹1000 </p>
            </Typography>
            </Box>
            <Box mt={2}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
              style={{fontSize: "18px"}}
            >
              <Grid
                item
                lg={6}
                md={6}
                xs={6}
                
              >Harvest Date</Grid> <p style={{
                  color: "#222"
              }}>May 12, 2020 </p>
            </Typography>
            </Box>
            <Box mt={2}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
              style={{fontSize: "18px"}}
            >
              <Grid
                item
                lg={6}
                md={6}
                xs={6}
              >Total Cost</Grid><p style={{
                color: "#222"
            }}>₹122 </p>
            </Typography>
            </Box>
        </Box>
        <Divider />
        <Box mt={2}>
          <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Confidence (%) : {95.5}%
            </Typography>
            <Box mt={2}>
            <LinearProgress
              value={95.5}
              variant="determinate"
            />
            </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string
};

export default TrafficByDevice;
