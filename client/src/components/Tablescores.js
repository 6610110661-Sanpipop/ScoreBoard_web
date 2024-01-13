import { Space, Table, Tag, Button } from 'antd';

function Tablescores(props){
    const columns  = [
        {
            key: 'id',
            title : 'StudentID',
            dataIndex: 'studentID'
        },
        {
            key: 'id',
            title : 'Score',
            dataIndex: 'score'
        },
        {
            key: 'id',
            title : 'Status',
            dataIndex: 'Status'
            ,render: Status => Status === 'P' ? <Tag color='green'>P</Tag> : Status === 'N' ? <Tag color='blue'>N</Tag> :  <Tag color='red'>T</Tag>
        },
        {
            key: 'id',
            title : 'annouce',
            dataIndex: 'announce'
        },
    ]

    return (
        <div>
            <Table columns={columns} dataSource={props.data}/>
        </div>
    )
}

export default Tablescores;

