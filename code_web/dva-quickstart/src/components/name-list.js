import React from 'react';
import {Row, Col, Icon, Pagination, Table, Popover, Card} from 'antd'
import CardSvg from '../images/svg-card'
// import service from "../services";

class NameList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: 'list',
      loading: true,
      data: [],
      page: 1,
      columns: [
        {
          dataIndex: 'first_name',
          title: 'First Name',
          align: 'center',
          render: desc => <Popover content={desc}>{desc}</Popover>,
        },
        {
          dataIndex: 'last_name',
          title: 'Last Name',
          align: 'center',
          render: desc => <Popover content={desc}>{desc}</Popover>,
        },
        {
          dataIndex: 'npi',
          title: 'Phone Number',
          align: 'center',
          render: desc => <Popover content={desc}>{desc}</Popover>,
        },
        {
          dataIndex: 'languages',
          title: 'Language',
          align: 'center',
          render: desc => <Popover content={desc[0].name}>{desc[0].name}</Popover>,
        }
      ]
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const {data} = nextProps;
    if (JSON.stringify(data) !== JSON.stringify(prevState.data)) {
      return {
        data,
        loading: false
      };
    }
    return null;
  }

  handleChange=(page,size)=>{
    this.setState({page})
  };

  render(){
    const {type, data, columns, loading,page} = this.state;
    return (
      <div className='name-list' style={{overflowY: 'scroll', height: '100vh'}}>
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
          {
            type === 'card' &&
            <Col span={20} style={{textAlign: 'right'}}>
              <Pagination pageSize={8} onChange={this.handleChange} current={page} total={data.length} />
            </Col>
          }
        </Row>

        <div className='name-list-content'>
          {
            type === 'list' ?
              <Table
                dataSource={data}
                loading={loading}
                columns={columns}
              />
              :
              function () {
                const row = [];
                const col = data.filter((item,index)=>{
                  if(8*(page-1)<=index&&index<8*page)
                    return true
                  return false
                }).map((item,index)=>{
                  return (
                    <Col span={4} key={item.npi} offset={index%4 ? 2 : 1}>
                      <Card
                        hoverable
                        size='small'
                        headStyle={{textAlign: 'center'}}
                        style={{borderRadius: 20}}
                        title={<span>
                          <img style={{borderRadius: '100%'}} src={item.image_url} alt=""/>
                          <div>{item.first_name+" "+ item.middle_name+" "+item.last_name}</div>
                        </span>}
                      >
                       <div style={{
                         wordBbreak:'keep-all', /* 不换行 */
                         whiteSpace: 'nowrap' /* 不换行 */
                       }}>
                         Phone Number:{item.npi}
                         </div>
                       <div>Language: {item.languages[0].name}</div>
                       <div style={{
                         height: '100px',
                         overflow: 'hidden',
                         textOverflow: 'ellipsis',
                       }}>
                         <Popover content={
                           <div style={{
                             padding: 20,
                             width: '40vw',
                             height: '40vh'
                           }}>
                             Bio: ${item.bio}
                           </div>
                         }>
                           Bio: {item.bio}
                         </Popover>
                       </div>
                      </Card>
                    </Col>
                  )
                });
                for(let i = 0,j=4; i<col.length; i+=4,j+=4){
                  row.push(col.slice(i, j));
                }
                return row.map((item,index) =>  <Row style={{marginTop: 30}} key={String(new Date().getTime())+index}>{item}</Row>);
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
