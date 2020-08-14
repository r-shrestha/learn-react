import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const data = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

function ProductRow(props) {
    return (
        <tbody>
            <tr>
                <td>{props.product.name}</td>
                <td>{props.product.price}</td>
            </tr>
        </tbody>
    )
}

function ProductCategoryRow(props) {
    const productRows = props.products.map((product, index) =>
        <ProductRow key={index} product={product} />);

    return (
        <React.Fragment>
            <thead>
                <tr colSpan="2">
                    <th >
                        {props.category}
                    </th>
                </tr>
            </thead>
            {productRows}
        </React.Fragment>
    );


}

function ProductTable(props) {
    const productsByCategory = groupBy(props.data, 'category');

    let categoryRows = [];
    let id = 1;
    for (let category in productsByCategory) {
        categoryRows.push(<ProductCategoryRow key={id++} category={category} products={productsByCategory[category]} />);
    }

    return (
        <React.Fragment>
            <SearchBar onChange={props.onChange} />
            <table>
                {categoryRows}
            </table>
        </React.Fragment>);
}


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event);
    }


    render() {
        return (<div>
            <input type="text" name="filterText" value={this.props.searchText} placeholder="Search..." onChange={this.handleChange} />
            <br />
            <input type="checkbox" name="inStockOnly" value={this.props.isChecked} onChange={this.handleChange} />
        </div>)
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filterText: '',
            inStockOnly: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let val = name==='filterText'?event.target.value:event.target.checked;
        this.setState({[name]:val});
    }

    render() {
        let filteredData = data.filter(p => p.name.toLocaleLowerCase().includes(this.state.filterText.toLocaleLowerCase()));
        filteredData = this.state.inStockOnly ? filteredData.filter(p => p.stocked === true) : filteredData;

        return <ProductTable data={filteredData} onChange={this.handleChange} />
    }

}

function groupBy(collection, key) {
    return collection.reduce(function (accumulator, currentValue) {
        (accumulator[currentValue[key]] = accumulator[currentValue[key]] || []).push(currentValue);
        return accumulator;
    }, {}) // initial value of the accumulator here is {}
}

export default FilterableProductTable;