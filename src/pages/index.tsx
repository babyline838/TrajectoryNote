import styles from './index.less';
import { Button, PageHeader, Space, Table } from "antd";
import React from "react";
import { history } from 'umi';
import moment from "moment";
import { Trajectory } from "@/models/trajectory";

export default function IndexPage() {
  const columns = [
    {
      title: '记录日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: string, record: Trajectory) => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      date: '2022-03-15',
      records: []
    },
  ];

  return (
    <div className={styles.container}>
      <PageHeader
        className={styles.title}
        title='流调记录'
      />

      <div className={styles.actions}>
        <Button type='primary' onClick={() => {
          history.push(`/day/${moment().format('YYYY-MM-DD')}`)
        }}>
          今日登记
        </Button>
      </div>

      <Table<Trajectory> columns={columns} dataSource={data} rowKey='date'/>
    </div>
  );
}
