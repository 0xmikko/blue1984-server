/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumb } from "../../components/PageHeader/Breadcrumb";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { Loading } from "../../components/Loading";
import { STATUS } from "../../utils/status";
import { AccountsList } from "../../containers/Accounts/ListView";
import { RootState } from "../../store";
import actions from "../../store/actions";
import { ToolbarButton } from "../../containers/ToolbarButton";
import { DataScreen } from "../../components/DataLoader/DataScreen";

export const AccountsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.accounts.getList());
  }, []);

  const { data, status } = useSelector(
    (state: RootState) => state.accounts.List
  );

  const breadcrumbs: Breadcrumb[] = [
    {
      url: "/accounts",
      title: "Accounts",
    },
  ];

  const onSelect = (id: string) => history.push(`/accounts/${id}`);


  return (
    <div className="content content-fixed">
      <PageHeader
        title={"My accounts"}
        breadcrumbs={breadcrumbs}
      />
      <DataScreen
        data={data}
        status={status}
        component={AccountsList}
        onSelect={onSelect}
      />
    </div>
  );
};
