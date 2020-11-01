import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ predictedData, className, ...rest }) => {
  const classes = useStyles();
  const [data] = useState(predictedData);

  console.log(data);

  React.useEffect(() => {
    // setData(predictedData.filter((dat) => {return dat.confidence > 0}))
  }, [])

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Crop Recommendations For : PLOT 1" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Crop ID
                </TableCell>
                <TableCell>
                  Crop Name
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Harvest On
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Confidence %
                </TableCell>
                <TableCell>
                  Expected Profits
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { predictedData !== undefined && predictedData.map((crop, index) => {
                return (<TableRow
                  hover
                  key={index}
                >
                  <TableCell>
                    {index}
                  </TableCell>
                  <TableCell>
                    {crop.crop_list}
                  </TableCell>
                  <TableCell>
                    {moment(1554930000000).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={crop.confidence.toPrecision(3)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {`1000`}
                  </TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
