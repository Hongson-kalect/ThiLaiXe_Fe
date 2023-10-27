import { Table } from "antd";
import { styled } from "styled-components";

export const CustomTable = styled(Table)`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  /* overflow: auto; */
  table-layout: fixed;

  gap: 2px;
  border-radius: 8px;
  .ant-spin-nested-loading {
    width: 100%;
  }
  table {
    border-spacing: 2px;
  }

  thead.ant-table-thead {
    position: sticky;
    top: 0;
    z-index: 1;
    white-space: nowrap;
    height: 31px !important;
    font-size: 14px;
    th,
    tr {
      font-weight: 700;
      padding: 3px 10px !important;
      margin: 1px;
    }
    th {
      background-color: #eceef0;
      text-align: center;
      padding: 6px 10px;
    }
  }
  tbody.ant-table-tbody {
    line-height: 16px;
    /* white-space: nowrap; */
    tr {
      text-align: center;
      height: 28px;
      margin: 1px;
      // height: 28px;
      background: #f8f9fa;
      &.ant-table-row-selected td {
        background: #e9f9ee;
      }
    }
    td {
      height: 16px;
      padding: 2px 10px;
      font-size: 12px;
      color: #687076;
      font-weight: 400;
    }
  }

  button {
    height: 20px;
    margin: 0;
    padding: 4px;
    display: flex;
    align-items: center;
  }

  .options {
    display: flex;
    column-gap: 8px;
    .btn-edit {
      background-color: yellow;
    }
    .btn-del {
      color: white;
      background-color: red;
    }
  }
`;
