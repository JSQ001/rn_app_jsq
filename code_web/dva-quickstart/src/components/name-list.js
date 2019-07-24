import React from 'react';
import {Row, Col, Icon, Pagination, Table, Popover, Card} from 'antd'
import CardSvg from '../images/svg-card'
import service from "../services";

class NameList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: 'list',
      data: [
        {id: 1,name: 1,},
        {id: 1,name: 12,},
        {id: 1,name: 13,},
        {id: 1,name: 14,},
        {id: 1,name: 15,},
        {id: 1,name: 16,},
        {id: 1,name: 17,},
      ],
      columns: [
        {
          dataIndex: 'id',
          title: 'First Name',
          align: 'center',
          render: recode => <Popover content={recode}>{recode}</Popover>,
        },
        {
          dataIndex: 'id',
          title: 'Last Name',
          align: 'center',
          render: recode => <Popover content={recode}>{recode}</Popover>,
        },
        {
          dataIndex: 'id',
          title: 'Phone Number',
          align: 'center',
          render: recode => <Popover content={recode}>{recode}</Popover>,
        },
        {
          dataIndex: 'id',
          title: 'Language',
          align: 'center',
          render: recode => <Popover content={recode}>{recode}</Popover>,
        }
      ]
    };
  }

  componentDidMount(){
    this.getInfo()
  }

  getInfo = ()=>{
    service.getInfo().then(res=>{
      console.log(res)
    })
  };


  render(){
    const {type, data, columns} = this.state;

    return (
      <div className='name-list'>
        <Row style={{borderBottom: '1px solid',paddingBottom: 2}}>
          <Col span={2} style={{fontSize: 20}}>医生名单</Col>
          <Col span={2} >
            <Icon type="unordered-list"
                  onClick={()=> this.setState({type: 'list'})}
                  style={{
                    color: type === 'list' ? '#4A90E2' : '#4A4A4A',
                    fontSize: 20
                  }}
            />
            <CardSvg onClick={()=>this.setState({type: 'card'})}
                     style={{ color: type === 'card' ? '#4A90E2' : '#515151',fontSize: 20, margin: '5px 5px 0px ' }} />
          </Col>
          <Col span={20}>
            <Pagination defaultCurrent={1} total={50} />
          </Col>
        </Row>

        <div className='name-list-content'>
          {
            type === 'list' ?
              <Table
                dataSource={data}
                columns={columns}
              />
              :
              function () {
                const row = [];
                const col = data.map((item,index)=>{
                  return (
                    <Col span={5} offset={index%4 ? 1 : 0}>
                      <Card>
                        {item.name}
                      </Card>
                    </Col>
                  )
                });
                for(let i = 0,j=4; i<col.length; i+=4,j+=i ){
                  row.push(col.slice(i, j));
                }
                return row.map((item,index) => <Row key={String(new Date().getTime())+index}>{item}</Row>);
              }()
          }
        </div>
      </div>
    );
  }
};

NameList.propTypes = {
};

export default NameList
