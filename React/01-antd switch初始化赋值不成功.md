# antd switch 赋值不成功

最近在使用antd switch时，遇到一个意外的问题，switch组件初始化赋值没成功

```javascript
import React, { useEffect } from 'react';
import { Form, Switch } from 'antd';

const ModalCreater = ({ data, close, callback }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {};

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        status: !!data.status,
      });
    } else {
      form.setFieldsValue({
        status: true,
      });
    }
  }, [data]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="状态"
        name="status"
       >
      	<Switch />
      </Form.Item>
			...
    </Form>
  );
};

export default ModalCreater;

```

发现在赋值是，switch并没有按照指定状态选中

查看form文档得知，form在初始化值是，`Form.Item`默认初始化的属性值是`value`，这也就是组件值通过value填充的组件都没什么问题，比如Input、Select等，而Switch组件填充值为`checked`

知道问题原因后就好修改了：设置`Form.Item`渲染属性值`checked`，通过`valuePropName`api来实现

使用方式如下：

```javascript
<Form.Item
  label="状态"
  name="status"
  valuePropName="checked"
>
  <Switch />
</Form.Item>
```

大功告成！！！
