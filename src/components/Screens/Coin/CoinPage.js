import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { selectCoin } from './../../../Actions/CoinActions';
import Chart from './Chart/Chart';
import Ranges from './Range/Ranges';
import PriceHeader from './PriceHeader';
import SocialRow from './SocialRow';
import InfoRow from './InfoRow';
import ChangeRow from './ChangeRow';
import Images from '@assets/images.js';


class CoinPage extends Component {

    componentDidMount() {
       // console.log('componentDidMount coin page', this.props);
        this.props.selectCoin(this.props.coin);
    }
    render() {
        const { coinData } = this.props;
        //console.log('RENDERING COINPAGE', coinState);

        return (
            <ScrollView style={styles.container}>
                <PriceHeader
                    price={coinData.currentPrice}
                    symbol={'USD'}
                />
                <ChangeRow />
                <Chart />
                <Ranges />
                <InfoRow
                    title={coinData.market_cap}
                    subtile={'Market Cap'}
                    badge={`#${this.props.rank}`}
                />
                <InfoRow
                    title={coinData.total_volume}
                    subtile={'24h Volume'}
                />
                <InfoRow
                    title={coinData.circulating_supply}
                    subtile={'Circulating Supply'}
                />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    }
});

function mapStateToProps(state) {
    return {
        coinData: state.coinState.coinData
    };
}
export default connect(mapStateToProps, { selectCoin })(CoinPage);
