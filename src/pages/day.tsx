import React from 'react';
import styles from './day.less';
import { IRouteComponentProps } from "umi";
import { Form, Input, PageHeader } from "antd";

export default function Page(props: IRouteComponentProps<{ date: string }>) {
  const [form] = Form.useForm();

  return (
    <div className={styles.container}>
      <PageHeader
        className={styles.title}
        title={`${props.match.params.date} 流调记录`}
        onBack={() => window.history.back()}
      />

      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          label="具体时间范围"
          name="time-range"
          rules={[{ required: true, message: '请选择具体时间范围' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="具体位置"
          name="location"
          rules={[{ required: true, message: '请输入具体位置' }]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </div>
  );
}
