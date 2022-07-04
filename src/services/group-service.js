export const groupService = {
    query,
    updateGroup,
    removeProdFromGroup,
    deleteGroup
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
    },
    {
        id: 'g102',
        title: 'Camping list',
        createdAt: Date.now() - 100000000,
        updatedAt: '',
        products: [
            {
                id: 'p111',
                title: 'Tent',
                isDone: false,
                color: '#000000',
                description: '',
                priority: 1
            },
            {
                id: 'p112',
                title: 'Bag',
                isDone: false,
                color: '#000000',
                description: '',
                priority: 1
            },
            {
                id: 'p113',
                title: 'Gas',
                isDone: false,
                color: '#000000',
                description: '',
                priority: 1
            },
            {
                id: 'p114',
                title: 'Mangal',
                isDone: false,
                color: '#000000',
                description: '',
                priority: 1
            },
        ]
    },
]


function query() {
    console.log(gGroups)
    return Promise.resolve(gGroups)
}

async function updateGroup(groupId, updatedProduct) {

    try {
        const groups = await query()
        const groupIdx = getGroupIdxBy(groupId)
        const group = groups[groupIdx]
        if (!updatedProduct.id) {
            group.products.push(_createProd(updatedProduct.title))
        } else {
            const prevProdIdx = group.products.findIndex(product => product.id === updatedProduct.id)
            group.products.splice(prevProdIdx, 1, updatedProduct)
        }

        return groups
    } catch (err) {
        console.error(err)
    }
    console.log('gGroups', gGroups);
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

async function deleteGroup(groupId) {
    console.log('groupId', groupId);
    try {
        const groups = await query()
        const groupIdx = getGroupIdxBy(groupId)
        groups.splice(groupIdx, 1)
        return

    } catch (err) {
        console.error(err)
    }
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