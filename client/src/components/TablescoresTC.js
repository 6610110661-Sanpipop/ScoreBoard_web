import { Space, Table, Tag, Button } from 'antd';

function TablescoresTC(props){
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
        {
            key: 'id',
            title : 'Viewed',
            dataIndex: 'Viewed',
            // render: Viewed => Viewed ? <Button>Viewed</Button>:<Button>NotView</Button>
        },
        {
            key: 'id',
            title : 'Accepted',
            dataIndex: 'Accepted'
        },
    ]

    return (
        <div>
            <Table columns={columns} dataSource={props.data}/>
        </div>
    )
}

export default TablescoresTC;

