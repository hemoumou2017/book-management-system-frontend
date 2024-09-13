/*
 * @Author: 何欣 hexing@qq.com
 * @Date: 2024-09-12 20:18:30
 * @LastEditors: 何欣 hexing@qq.com
 * @LastEditTime: 2024-09-12 21:17:01
 * @FilePath: /nest学习/book-management-system-frontend/src/pages/BookManage/DetailBookModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Modal,Form,Input, InputNumber, message, DatePicker } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { detail, update } from "../../interfaces";
import  {CoverUpload}  from "./Coverupload";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface DetailBookModalProps {
    id: number;
    isOpen: boolean;
    handleClose: Function;
}
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

export interface DetailBook {
    id: number;
    name: string;
    author: string;
    cover: string;
    description: string;
    yearOfPublication: string;
    isbn: string;
    price: string;
}
export function DetailBookModal(props: DetailBookModalProps) {
    const [form] = useForm<DetailBook>()
   
    async function query() {
        if (!props.id) {
            return
        }
        try {
            const res = await detail(props.id)
            const { data } = res
            if (res.status === 201 || res.status === 200) {
                data.yearOfPublication =dayjs(data.yearOfPublication+'')
                form.setFieldsValue(data)
            }
        } catch (e:any) {
            message.error(e.response.data.message)
        }
    }

    useEffect(() => {
        query()
    }, [props.id])

    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

    return <Modal title="图书详情" open={props.isOpen}  onCancel={() => props.handleClose()} >
        <Form disabled={componentDisabled} form={form} colon={false} {...layout}>
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