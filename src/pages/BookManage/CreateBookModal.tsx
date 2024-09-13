import { Modal,Form,Input, InputNumber, message, DatePicker } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { create } from "../../interfaces";
import  {CoverUpload}  from "./Coverupload";

interface CreateBookModalProps {
    isOpen: boolean;
    handleClose: Function;
}
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

export interface CreateBook {
    name: string;
    author: string;
    cover: string;
    description: string;
    yearOfPublication: string;
    isbn: string;
    price: string;
}
export function CreateBookModal(props: CreateBookModalProps) {
    const [form] = useForm<CreateBook>()
    const handleOk = async () => {
        await form.validateFields()
        
        const values = form.getFieldsValue()
        console.log(values)
        try {
            const res = await create(values)
            if (res.status === 201 || res.status === 200) {
                message.success('创建成功')
                form.resetFields()
                props.handleClose()
            }
        } catch (e:any) {
            message.error(e.response.data.message)
        }
    }
    return <Modal title="新增图书" open={props.isOpen} onOk={handleOk} onCancel={() => props.handleClose()} okText={'创建'}>
        <Form form={form} colon={false} {...layout}>
            <Form.Item label="书名" name="name" rules={[{ required: true, message: '请输入书名' }]}>
                <Input placeholder="请输入书名" />
            </Form.Item>
            <Form.Item label="作者" name="author" rules={[{ required: true, message: '请输入作者' }]}>
                <Input placeholder="请输入作者" />
            </Form.Item>
            <Form.Item label="描述" name="description" rules={[{ required: true, message: '请输入描述' }]}>
                <TextArea placeholder="请输入描述" />
            </Form.Item>
            <Form.Item label="出版年份" name="yearOfPublication" rules={[{ required: true, message: '请输入出版年份' }]}>
            <DatePicker picker="year" />
            </Form.Item>
            <Form.Item label="ISBN" name="isbn" rules={[{ required: true, message: '请输入ISBN' }]}>
                <Input placeholder="请输入ISBN" />
            </Form.Item>
            <Form.Item label="价格" name="price" rules={[{ required: true, message: '请输入价格' }]}>
                <InputNumber placeholder="请输入价格" />
            </Form.Item>
            <Form.Item label="封面" name="cover" rules={[{ required: true, message: '请上传封面' }]}>
                <CoverUpload></CoverUpload>
            </Form.Item>
        </Form>
    </Modal>
}