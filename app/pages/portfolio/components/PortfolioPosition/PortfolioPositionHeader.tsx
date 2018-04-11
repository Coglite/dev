import Typography from 'material-ui/Typography';
import * as React from 'react';

export const PositionHeader = (name: string, quantity: number) => (
  <div>
    <Typography variant="body2" component="span" color={quantity > 0 ? 'default' : 'secondary'}>
      {name}
    </Typography>
    <Typography variant="body2" component="span" color="secondary">
      {quantity.toPrecision(5)}
    </Typography>
  </div>
);
