import React from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import morenlogo from 'assets/我的卡包-信用/DEFAULT_LOGO.png';
import { bankImg } from '../../utils/appUtils';
import './Balance.css';


// const NUM_ROWS = data.length;
let pageIndex = 0;

function genData(pIndex = 0, NUM_ROWS) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}



class ChooseBankCard extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            totals: 0,
            data: [],
        };
    }

    //查询我的地址信息
    componentWillMount() {
        //储蓄卡初始化查询
        this.props.dispatch({
            type: 'cust/getDebitCardList',
            payload: {
                pageSize: 10,
                pageNo: 1
            }
        });
    }

    componentWillReceiveProps() {
        this.setState({
            totals: this.props && this.props.total ? parseInt(this.props.total) : 0,
            data: this.props && this.props.list ? this.props.list : []
        })
    }


    componentDidMount() {
        setTimeout(() => {
            this.rData = genData(0, this.state.totals);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);
    }

    //下滑翻页
    onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true });
        //分页查询
        this.props.dispatch({
            type: 'cust/getDebitCardList',
            payload: {
                pageSize: 10,
                pageNo: 1
            }
        });
        setTimeout(() => {
            this.rData = { ...this.rData, ...genData(++pageIndex, this.state.totals) };
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    }




    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    // height: 8,
                    borderTop: '0.083rem solid #ECECED',
                    borderBottom: '0.083rem solid #ECECED',
                }}
            />
        );

        let index = this.state.data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = this.state.data.length - 1;
            }
            const obj = this.state.data[index--];
            const bankArr = bankImg.find((element) => (element.label === (obj && obj.bankName))) || { value: morenlogo,style: 'blueBackgroundColor' };
            return (
                <div key={rowID} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw',
                    marginBottom: '0.833rem',
                }}>
                    <div className='redBackgroundColor'
                        onTouchEnd={() => {
                            this.props.history.push({
                                pathname: `${this.props.location.state}`,
                                bankId: obj && obj.id ? obj.id : ''
                            })
                        }}
                    >
                        <div className='firstRow' >
                            <div className='bankImg' style={{ justifyContent: 'space-around'}}>
                                <div style={{width:'4.167rem',float:'left'}}>
                                    <img alt='' src={bankArr.value}/>
                                </div>
                                <div style={{ float:'left',color: 'white', fontSize: '1.333rem',width:'11.167rem'}}>
                                    {obj.bankName}
                                </div>
                            </div>
                        </div>
                        <div className='secoundRowJieji'>
                            <div style={{ fontSize: '1.833rem', color: 'white', width: '70%' }}>
                                {obj.cardNo}
                            </div>
                            <div style={{ color: '#ffff00de', width: '15%', fontSize: '1.333rem' }}>
                                {this.props.location.id === obj.id ? '已选择' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div style={{ paddingTop: '100px' }}>
                <div className='headStyle' style={{ height: '100px'}}>
                    <div style={{
                        height: '100%',
                        width: '6.667rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        left: '0px'
                    }} onClickCapture={() => { this.props.history.goBack(-1) }}>
                        <img alt='' src={back} style={{ width: '26px', zIndex: '200' }} />
                    </div>
                    <p style={{ fontSize: '1.167rem', display: 'inline-block' }}>选择银行卡</p>
                </div>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    renderSeparator={separator}
                    className="packagelist"
                    pageSize={4}
                    useBodyScroll
                    scrollRenderAheadDistance={500}
                    onEndReached={() => this.onEndReached}
                    onEndReachedThreshold={10}
                />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const { list, total, offset } = state.cust;
    return {
        loading: state.loading.models.cust,
        list,
        total,
        offset
    };
}

export default connect(mapStateToProps)(ChooseBankCard);
