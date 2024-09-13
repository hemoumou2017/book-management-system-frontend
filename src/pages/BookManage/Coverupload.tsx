/*
 * @Author: 何欣 hexing@qq.com
 * @Date: 2024-09-12 17:23:24
 * @LastEditors: 何欣 hexing@qq.com
 * @LastEditTime: 2024-09-12 17:47:43
 * @FilePath: /nest学习/book-management-system-frontend/src/pages/BookManage/Coverupload.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from "antd";
import Dragger,{ DraggerProps } from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
let onChange = Function;

const props: DraggerProps = {
    name: 'file',
    action: 'http://localhost:3000/book/upload',
    method: 'post',
    onChange(info: any) {
        const {status} = info.file;
        if (status === 'done') {
            onChange(info.file.response)
            message.success(`${info.file.name}上传成功`);
            console.log(info.file, info.fileList);
        } else if (status === 'error') {
            message.error(`${info.file.name}上传失败`);
        }
    }
}
interface CoverUploadProps {
    value?: string;
    onChange?: Function;
}
const dragger = <Dragger {...props}>
    <p className="ant-upload-drag-icon">
        <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽上传</p>
</Dragger>;

export function CoverUpload(props: CoverUploadProps) {
    onChange = props.onChange!;
    console.log(props.value);
    return props?.value ? <div>
        <img src={'http://localhost:3000/' + props.value} alt="封面" width="100" height="100" />
            {dragger}  
        </div>
        :
        <div>
            {dragger}
         </div>
}