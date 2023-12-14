import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTransactions} from '../Action/UserAction'
import { Table,Tag } from 'antd'


const Transactions = ({reload}) => {
    const dispatch = useDispatch()

  const { doc, loading } = useSelector((state) => state.transaction)
  useEffect(() => {
        dispatch(getAllTransactions())
    }, [dispatch,reload])

    const columns = [
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        {
          title: 'Description',
          dataIndex: 'descreption',
          key: 'description',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
          render: (text, record) => (
            <span className={text === 'income' ? 'text-green-700' : 'text-red-900'}>{text}</span>
          ),
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'income',
        },
      ];

  return (
    <div className='-z-10'>
        {
            loading?"loading":
            <div>
                <div>
                    <div>
                        <Table columns={columns} dataSource={doc?.data?.doc}/>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Transactions