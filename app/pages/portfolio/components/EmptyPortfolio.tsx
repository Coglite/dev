import { Button, Typography } from 'material-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const EmptyPortfolio = () => {
  return (
    <div>
      <Typography variant="title">No data yet</Typography>
      <Typography variant="subheading">
        Try to add an<Button
          type='dense'
          color="primary"
          component={props => <Link {...props as any} to="/sources" />}
        >
          exchange
        </Button>
        or a<Button type='dense' color="primary" component={props => <Link {...props as any} to="/wallets" />}>
          wallet
        </Button>
      </Typography>
    </div>
  );
};
