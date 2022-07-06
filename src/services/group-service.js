
const GROUP_KEY = 'groups'

export const groupService = {
    query,
    updateGroup,
    deleteGroup,
    addGroup,
}


// let gGroups = [
//     {
//         id: 'g101',
//         title: 'Supermarket - Friday list',
//         createdAt: Date.now() - 100000000,
//         updatedAt: '',
//         products: [
//             {
//                 id: 'p101',
//                 title: 'Eggs',
//                 isDone: false,
//                 color: '#000000',
//                 description: '',
//                 priority: 1
//             },
//             {
//                 id: 'p102',
//                 title: 'Milk',
//                 isDone: false,
//                 color: '#000000',
//                 description: '',
//                 priority: 1
//             },
//             {
//                 id: 'p103',
//                 title: 'Cheese',
//                 isDone: false,
//                 color: '#000000',
//                 description: '',
//                 priority: 1
//             },
//             {
//                 id: 'p104',
//                 title: 'Fish',
//                 isDone: false,
//                 color: '#000000',
//                 description: '',
//                 priority: 1
//             },
//         ]
//     },
//     {
//         id: 'g102',
//         title: 'Camping list',
//         createdAt: Date.now() - 100000000,
//         updatedAt: '',
//         products: [
//             {
//                 id: 'p111',
//                 title: 'Tent',
//                 isDone: false,
//                 color: '#000000',
//                 description: '',
//                 priority: 1
//             },
//             {
//                 id: 'p112',
//                 title: 'Bag',
//                 isDone: false,
//                 color: '#000000',
//                 description: '',
//                 priority: 1
//             },
//             {
//                 id: 'p113',
//                 title: 'Gas',
//                 isDone: false,
//                 color: '#000000',
//                 description: '',
//                 priority: 1
//             },
//             {
//                 id: 'p114',
//                 title: 'Mangal',
//                 isDone: false,
//                 color: '#000000',
//                 description: '',
//                 priority: 1
//             },
//         ]
//     },
// ]


async function query() {
    const groups = JSON.parse(localStorage.getItem(GROUP_KEY)) || []
    console.log('query ~ groups', groups)
    return Promise.resolve(groups)
}

async function updateGroup(groupId, updatedProduct = null, prodToRemoveId = null) {
    try {
        const groups = await query()
        const groupIdx = await getGroupIdxBy(groupId)
        const group = structuredClone(groups[groupIdx])
        let { products } = group
        if (prodToRemoveId) {
            products = products.filter(prod => prod.id !== prodToRemoveId)
        }
        else if (updatedProduct && !updatedProduct.id) {
            products.push(_createProd(updatedProduct.title))
        }
        else {
            const prevProdIdx = products.findIndex(product => product.id === updatedProduct.id)
            products.splice(prevProdIdx, 1, updatedProduct)
        }
        group.products = [...products]
        groups[groupIdx] = group
        _saveToStorage(groups)
        return groups
    } catch (err) {
        console.error(err)
    }
}

async function addGroup(groupToAdd) {
    console.log('addGroup ~ groupToAdd', groupToAdd)
    try {
        const groups = await query()
        const newGroup = {
            id: _makeId(),
            title: groupToAdd.title,
            createdAt: Date.now(),
            updatedAt: '',
            products: [],
        }
        groups.push(newGroup)
        _saveToStorage(groups)
        return newGroup
    } catch (err) {
        console.error(err)
    }
}

async function deleteGroup(groupId) {
    console.log('deleteGroup ~ groupId', groupId)
    try {
        const groups = await query()
        const groupIdx = await getGroupIdxBy(groupId)
        console.log('deleteGroup ~ groupIdx', groupIdx)
        const removedGroupArr = groups.splice(groupIdx, 1)
        console.log('deleteGroup ~ removedGroupArr', removedGroupArr)
        console.log('deleteGroup ~ groups', groups)
        _saveToStorage(groups)
        return removedGroupArr[0]
    } catch (err) {
        console.error(err)
    }
}

async function getGroupIdxBy(id) {
    const groups = await query()
    return groups.findIndex((group) => group.id === id)
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

function _saveToStorage(groups) {
    localStorage.setItem(GROUP_KEY, JSON.stringify(groups))
}

// function updateGroupBy(id) {
//     const
// }