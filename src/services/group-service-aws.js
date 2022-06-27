import { DynamoDB } from "aws-sdk"
import { configuration } from '../aws.config.ts'


const docClient = new DynamoDB.DocumentClient(configuration)
console.log('docClient', docClient)
const COLLECTION_NAME = 'list-up-app-SampleTable-YJ54YT7L7VGY'

// export const fetchData = (tableName) => {
//     var params = {
//         TableName: tableName
//     }

//     docClient.scan(params, function (err, data) {
//         if (!err) {
//             console.log('data from AWS', data)
//         } else {
//             console.log(err);
//         }
//     })
// }

export const groupServiceAWS = {
    query,
    updateGroup,
    removeProdFromGroup
}


const gGroups = [
    {
        id: 'g101',
        title: 'Supermarket - Friday list',
        createdAt: Date.now() - 100000000,
        updatedAt: '',
        products: [
            {
                id: 'p101',
                title: 'Eggs',
                isDone: false,
                color: '#000000',
                description: '',
                priority: 1
            },
            {
                id: 'p102',
                title: 'Milk',
                isDone: false,
                color: '#000000',
                description: '',
                priority: 1
            },
            {
                id: 'p103',
                title: 'Cheese',
                isDone: false,
                color: '#000000',
                description: '',
                priority: 1
            },
            {
                id: 'p104',
                title: 'Fish',
                isDone: false,
                color: '#000000',
                description: '',
                priority: 1
            },
        ]
    }
]


async function query() {
    var params = {
        TableName: COLLECTION_NAME,
    }

    const data = await docClient.scan(params).promise()
    // console.log('query ~ data', data)
    return data.Items
}

async function updateGroup(groupId, updatedProduct) {

    try {
        const groups = await query()
        const groupIdx = getGroupIdxBy(groupId)
        const group = groups[groupIdx]
        if (!updatedProduct.id) {
            group.products.push(_createProd(updatedProduct.title))
            var params = {
                TableName: COLLECTION_NAME,
                Item: group
            }
            const data = await docClient.put(params).promise()
            console.log('updateGroup ~ data', )
            return data.$response.request.params.Item
        } else {
            const prevProdIdx = group.products.findIndex(product => product.id === updatedProduct.id)
            group.products.splice(prevProdIdx, 1, updatedProduct)
            
        }

        return groups
    } catch (err) {
        console.error(err)
    }
}

async function removeProdFromGroup(groupId, prodId) {
    try {
        const groups = await query()
        const groupIdx = getGroupIdxBy(groupId)
        const group = groups[groupIdx]
        group.products = group.products.filter(prod => prod.id !== prodId)

    } catch (err) {
        console.error(err)
    }
    console.log('gGroups', gGroups);
}

function getGroupIdxBy(id) {
    return gGroups.findIndex((group) => group.id === id)
}

function _createProd(title) {
    const newProd = {
        id: _makeId(),
        title,
        isDone: false,
        color: '#000000',
        description: '',
        priority: 1
    }
    return newProd
}

function _makeId(length = 3) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

// function updateGroupBy(id) {
//     const
// }