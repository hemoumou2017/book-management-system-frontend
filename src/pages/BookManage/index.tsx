/*
 * @Author: 何欣 hexing@qq.com
 * @Date: 2024-09-12 15:54:25
 * @LastEditors: 何欣 hexing@qq.com
 * @LastEditTime: 2024-09-12 21:22:12
 * @FilePath: /nest学习/book-management-system-frontend/src/pages/BookManage/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: 何欣 hexing@qq.com
 * @Date: 2024-09-12 15:54:25
 * @LastEditors: 何欣 hexing@qq.com
 * @LastEditTime: 2024-09-12 16:56:25
 * @FilePath: /nest学习/book-management-system-frontend/src/page/BookManage/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Card,Form, Input, message, Popconfirm } from "antd"
import './index.css'
import { list, deleteById } from "../../interfaces"
import { useEffect, useState } from "react"
import { CreateBookModal } from "./CreateBookModal"
import { UpdateBookModal } from "./UpdateBookModal"
import { DetailBookModal } from "./DetailBookModal"
interface Book {
  id: number
  name: string
  author: string
  description: string
  cover: string
  
}

export function BookManage() {

  const [bookList, setBookList] = useState<Book[]>([])
  const [name, setName] = useState<string>("")
  const [isCreateBookModalOpen, setCreateBookModalOpen] = useState<boolean>(false)
  const [isUpdateBookModalOpen, setUpdateBookModalOpen] = useState<boolean>(false)
  const [updateId, setUpdateId] = useState<number>(0)
  const [isDetailBookModalOpen, setDetailBookModalOpen] = useState<boolean>(false)
  async function getBookList() {
    const data = await list(name)
    try {
      if (data.status === 200 || data.status === 201) {
        setBookList(data.data)
      }
    } catch (e:any) {
      message.error(e.response.data.message)
    }
  }

  async function searchBook(values: {name: string;}) {
    setName(values.name)
  }


  async function handleDelete(id: number) {
    try {
      await deleteById(id)
      message.success("删除成功")
      setNum(Math.random())
      
    } catch (e:any) {
      message.error(e.response.data.message)
    }
  }

  const [num, setNum] = useState<number>(0)
  useEffect(() => {
    getBookList()
  }, [name, num])

  return (
    <div id="bookManage">
      <CreateBookModal isOpen={isCreateBookModalOpen} handleClose={() => {
        setCreateBookModalOpen(false)
        setNum(Math.random())
      }}></CreateBookModal>
      <UpdateBookModal id={updateId} isOpen={isUpdateBookModalOpen} handleClose={() => {
        setUpdateBookModalOpen(false)
        setNum(Math.random())
      }}></UpdateBookModal>
      <DetailBookModal id={updateId} isOpen={isDetailBookModalOpen} handleClose={() => {
        setDetailBookModalOpen(false)
      }}></DetailBookModal>
      <h1>图书管理系统</h1>
      <div className="content">
        <div className="book-search">
          <Form layout="inline" colon={false} name="search" onFinish={searchBook}>
            <Form.Item label="图书名" name="name">
              <Input placeholder="请输入书名" />
            </Form.Item>
            <Form.Item label="   ">
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button type="primary" htmlType="submit" style={{background:'green'}} onClick={()=>{
                setCreateBookModalOpen(true)
              }}>添加图书</Button>
            </Form.Item>
          </Form>
        </div>
        <div className="book-list">
          {
            bookList.map((item: Book) => {
              return (
                <Card className="card" hoverable style={{width: 300}} cover={<img alt="example" src={`http://localhost:3000/${item.cover}`} />}>
                  <h2>{item.name}</h2>
                  <div>{item.author}</div>
                  <div className="links">
                    <a href="#" onClick={() => {
                      setUpdateId(item.id)
                      setDetailBookModalOpen(true)
                    }}>详情</a>
                    <a href="#" onClick={()=>{
                      setUpdateId(item.id)
                      setUpdateBookModalOpen(true)
                    }}>编辑</a>
                    <Popconfirm title="图书删除" description="确定删除图书吗？" onConfirm={() => handleDelete(item.id)} okText="确认" cancelText="取消">
                      <a href="#">删除</a>
                    </Popconfirm>
                  </div>
                </Card>
                );
            })
          }
        </div>
      </div>
      </div>
  )
}