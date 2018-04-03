import React from 'react';
import { ButtonGroup, Button } from "@blueprintjs/core";

export default () => (
  <ButtonGroup minimal>
    <Button icon="shopping-cart">Missions</Button>
    <Button icon="people" disabled>People</Button>
  </ButtonGroup>
);
