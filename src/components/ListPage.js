import React, { useEffect, useState } from "react";
import PageAction from '../actions/PageAction';
import { Table, Space, Button, Modal } from "antd";
import LoadingMask from './LoadingMask';
import { showErrorNotification } from "../utils/notifications";

const ListPage = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [row, setRow] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (data.length > 0) {
            setIsLoading(false);
        }
    }, [data]);

    async function loadData(invalid) {
        setIsLoading(true);
        setData([]);
        const res = await PageAction.loadDataFromApi(invalid);
        if (res.status === 'error') {
            showErrorNotification("Error: Could not fetch data from server");
            setData([]);
            setIsLoading(false);
        } else {
            setData(res.works);
        }
    }

    const loadDataPerRecord = (record) => {
        setRow(record);
        showModal();
    }

    const getRowData = () => {
        if (row !== null) {
            return (
                <div><p>Cover Id : {row.cover_id}</p>
                    <p>Lending Edition : {row.lending_edition}</p>
                    <p>Edition Count : {row.edition_count}</p>
                    <p>Cover Edition key : {row.cover_edition_key}</p>
                    <p>IA code: {row.ia}</p>
                    <p>Availability : {row.availability.status}</p></div>

            )
        } else {
            return 'No data';
        }
    }

    const headers = [
        {
            title: "Id",
            dataIndex: 'cover_id',
            key : 'cover_id',
            sorter : (a, b) => a.cover_id - b.cover_id,
            sortDirections : ['ascend', 'descend']
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Author",
            dataIndex: "authors",
            render : (text, record) => <div>{record.authors[0].name}</div>
        },

    ]

    return (
        <>
            <LoadingMask isLoading={isLoading} />
            <Modal title={row !== null && row.title} visible={isModalVisible} onOk={handleCancel} onCancel={handleCancel}>
                {getRowData()}
            </Modal>
            <div className="heading">
            <Space>
                <Button data-testid="load-data" type="primary" onClick={(e) => loadData(false)}>Load Data</Button>
                <Button type="danger" onClick={(e) => loadData(true)}>Load from Invalid URL</Button>
            </Space>
            </div>
            <div>
                <Table data-testid='list-table'
                    className="listTable"
                    columns={headers}
                    dataSource={data}
                    onRow={(r) => ({
                        onClick: () => loadDataPerRecord(r)
                    })}
                    pagination={{ showSizeChanger: 'true', size: "small", defaultPageSize: "10" }}
                    bordered></Table>
            </div>
        </>
    )
}

export default ListPage;