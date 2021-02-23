import React from "react";
import { Badge, Card, CardBody } from "reactstrap";

import { Colxx } from "../../../../components/common/CustomBootstrap";

const ListItem = ({ item }) => {
  return (
    <Colxx xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.q1} {item.q2}
            </p>
            <div className="w-15 w-xs-100">
              <Badge color={item.labelColor} pill>
                {item.q3}
              </Badge>
            </div>
          </CardBody>
        </div>
        <div className="card-body pt-1">
          <p className="mb-0">{item.q12_detail}</p>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(ListItem);
