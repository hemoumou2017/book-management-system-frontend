/*
 * @Author: 何欣 hexing@qq.com
 * @Date: 2024-09-12 16:10:50
 * @LastEditors: 何欣 hexing@qq.com
 * @LastEditTime: 2024-09-12 21:18:11
 * @FilePath: /nest学习/book-management-system-frontend/src/interfaces/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import { CreateBook } from "../pages/BookManage/CreateBookModal";
import { UpdateBook } from "../pages/BookManage/UpdateBookModal";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 3000
});

export async function register(username: string, password: string) {
    return await axiosInstance.post("/user/register", {
        username,
        password
    });
}
export async function login(username: string, password: string) {
    return await axiosInstance.post("/user/login", {
        username,
        password
    });
}

export async function list(name: string) {
    return await axiosInstance.get("/book/list", {
        params: {
            name
        }
    });
}

export async function create(book: CreateBook) {
    return await axiosInstance.post("/book/create", {
        name: book.name,
        author: book.author,
        cover: book.cover,
        description: book.description,
        yearOfPublication: book.yearOfPublication,
        isbn: book.isbn,
        price: book.price
    });
}

export async function detail(id: number) {
    return await axiosInstance.get(`/book/${id}`,)
}

export async function update(book: UpdateBook) {
    return await axiosInstance.put(`/book/update`, {
        id: book.id,
        name: book.name,
        author: book.author,
        cover: book.cover,
        description: book.description,
        yearOfPublication: book.yearOfPublication,
        isbn: book.isbn,
        price: book.price
    });
}

export async function deleteById(id: number) {
    return await axiosInstance.delete(`/book/delete/${id}`);
}