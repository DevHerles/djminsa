import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List,Typography,Icon, Link} from '@material-ui/core';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';
import _ from '@lodash';
import HistoryListItem from './HistoryListItem';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date, condition, fat, carbs, protein) {
  return { date, condition, fat, carbs, protein };
}

const rowsx = [
  createData('12-01-2020', 'APTO'),
  createData('23-01-2020', 'NO APTO'),
];
const rows = [];

export default function BasicTable() {

  return (
    <List className="p-0">
        <FuseAnimateGroup
            enter={{
                animation: "transition.slideUpBigIn"
            }}
        >
            {
                rows.length > 0 ?
                rows.map((row) => (
                        <HistoryListItem item={row} key={row.id}/>
                    )
                ):
                <div>
                  <FuseAnimate animation="transition.slideRightIn" delay={300}>
                      <Typography className="normal-case flex items-center sm:mb-12 pl-20">
                          No cuenta con declaraciones juradas.
                      </Typography>
                  </FuseAnimate>
                </div>
            }
        </FuseAnimateGroup>
    </List>
  );
}