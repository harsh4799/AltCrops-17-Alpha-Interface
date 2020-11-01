import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Container,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
// import { Divide, Search as SearchIcon } from 'react-feather';
import { MonetizationOnOutlined as Mon } from '@material-ui/icons';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

const Initiate = ({ className, userData, setPredictedData, ...rest }) => {
const classes = useStyles();
const [plot, setPlot] = React.useState('');
const [budget, setBudget] = React.useState(0);
const [user, setUser] = React.useState({});

console.log(budget);

const handlePredict = () => {
  let body = {...user.plots[plot], area: 1000}
  let body1 = {
    area: 100,
    location : body.location
  }
  delete body1.location['_id'];
  // console.log(body1)
  Axios.post('https://ieee-hackathon-api.herokuapp.com/predict/', body1)
        .then((data) => {
            console.log(data.data);
            setPredictedData(data.data);
          })
  
}
const handleBudgetChange = (event) => {
  setBudget(event.target.value);
}

const handleChange = (event) => {
    setPlot(event.target.value);
};

React.useEffect(() => {
  setUser(userData);
}, [userData]);

  return (
    <React.Fragment>
<div
      className={clsx(classes.root, className)}
      {...rest}
    >
      
      <Box>
        <Card>
          <CardContent>
            <Box>
                <Container maxWidth={false}>
                <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                    lg={3}
                    md={3}
                    sm={12}
                >
            <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
                style={{
                    fontSize: "18px",
                    marginTop: "1rem"
                }}
            >
                PREDICT CROP 
            </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={3}
                    md={3}
                    sm={12}
                >
                    <TextField
                        fullWidth
                        type="number"
                        onChange={handleBudgetChange}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SvgIcon
                                fontSize="small"
                                color="action"
                            >
                                <Mon />
                            </SvgIcon>
                            </InputAdornment>
                        )
                        }}
                        placeholder="Budget"
                        variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={3}
                    md={3}
                    sm={12}
                >
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Plot Number</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={plot}
                        onChange={handleChange}
                        label="Plot Number"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>

                        {
                          user.plots !== undefined && user.plots.map((plt, index) => {
                            return <MenuItem value={index} key={index}>{`Plot ${index+1}`}</MenuItem>
                          })
                        }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={3}
                    md={3}
                    sm={3}
                >
                    <Button variant="contained" color="primary" onClick={handlePredict} style={{
                        maxWidth: '10rem',
                        minWidth: '8rem',
                        height: '3.5rem',
                    }}>Predict</Button>
                </Grid>
                </Grid>
                </Container>
                
                
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>

    </React.Fragment>
    
  );
};

Initiate.propTypes = {
  className: PropTypes.string
};

export default Initiate;
