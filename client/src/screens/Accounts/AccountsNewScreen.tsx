/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";

import PageHeader from "../../components/PageHeader/PageHeader";
import { Breadcrumb } from "../../components/PageHeader/Breadcrumb";
import { FormView } from "../../containers/Accounts/FormView";

import { getDetailsItem } from "../../store/dataloader";
import { STATUS } from "../../utils/status";
import { RootState } from "../../store";
import { Account } from "../../core/accounts";
import { DataFormScreen } from "../../components/DataLoader/DataFormScreen";

import actions from "../../store/actions";
import {Loading} from "../../components/Loading";

interface MatchParams {
  id: string;
}

interface AccountEditScreenProps extends RouteComponentProps<MatchParams> {}

export const AccountsNewScreen: React.FC<AccountEditScreenProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hash, setHash] = useState("0");
  const [isSubmitted, setIsSubmitted] = useState(false);


  const operationStatus = useSelector(
      (state: RootState) => state.operations.data[hash]?.data?.status
  );

  const id = "";

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== "0") {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          history.push(`/accounts/${id}`);
          break;

        case STATUS.FAILURE:
          setHash("0");
          setIsSubmitted(false);
          alert("Cant submit your operation to server");
      }
    }
  }, [hash, operationStatus]);

  const dataItem = useSelector((state: RootState) =>
      getDetailsItem(state.accounts.Details, id || "0")
  );

  if (dataItem === undefined) return <Loading/>;
  const { data, status} = dataItem;

  const breadcrumbs: Breadcrumb[] = [
    {
      url: "/account",
      title: 'Accounts',
    },
  ];

  const onSubmit = (values: Account) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    // Emit data
    dispatch(actions.accounts.addNewAccount(values.id, newHash));
  };

  return (
      <div className="content content-fixed">
        <PageHeader title={'Add new account'} breadcrumbs={breadcrumbs} />
        <DataFormScreen
            data={data}
            status={status}
            component={FormView}
            onSubmit={onSubmit}
            isSubmitted={isSubmitted}
        />
      </div>
  );
};
