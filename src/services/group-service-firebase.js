import { addDoc, collection, doc, getDoc, getDocs, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase.config'
import { utilService } from './util-service';

const groupCol = collection(db, 'group');

export const groupService = {
    getGroups,
    updateGroup,
    addGroup,
    deleteGroup,
    changeGroupIdx
}

async function getGroups() {
    const groupQuery = query(groupCol, orderBy('order'));
    const groupSnapshot = await getDocs(groupQuery);
    const groups = groupSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return groups;
}

async function updateGroup(groupId, updatedProduct = null, prodToRemoveId = null) {

    try {
        const groupRef = doc(db, 'group', groupId)
        const groupSnapshot = await getDoc(groupRef)
        const group = groupSnapshot.data()
        let { products } = group

        if (prodToRemoveId) {
            products = products.filter(prod => prod.id !== prodToRemoveId)
        } else if (updatedProduct && !updatedProduct.id) {
            products.push(_createProd(updatedProduct.title))
        } else {
            const prevProdIdx = products.findIndex(product => product.id === updatedProduct.id)
            products.splice(prevProdIdx, 1, updatedProduct)
        }

        group.products = [...products]
        await updateDoc(groupRef, group)

        return { ...group, id: groupRef.id }
    } catch (err) {
        console.error(err)
    }
}

async function deleteGroup(groupId) {
    try {
        const groupRef = doc(db, 'group', groupId)
        await deleteDoc(groupRef)
        return groupRef.id
    } catch (err) {
        console.error(err)
    }
}

async function addGroup(groupToAdd) {
    try {
        const newGroup = {
            title: groupToAdd.title,
            createdAt: Date.now(),
            updatedAt: '',
            products: [],
            order: 0
        }

        const groupSnapshot = await addDoc(groupCol, newGroup)
        return { ...newGroup, id: groupSnapshot.id }
    } catch (err) {
        console.error(err)
    }
}

async function changeGroupIdx(prevIdx, newIdx) {
    try {
        const groups = await getGroups();
        // const groupToMove = groups.splice(prevIdx, 1)[0];
        // groups.splice(newIdx, 0, groupToMove);

        const prevGroup = groups[prevIdx];
        const newGroup = groups[newIdx];
        const prevGroupRef = doc(db, 'group', prevGroup.id);
        const newGroupRef = doc(db, 'group', newGroup.id);
        await Promise.all(
            [updateDoc(prevGroupRef, { order: newIdx }),
            updateDoc(newGroupRef, { order: prevIdx })])
        return Promise.resolve()
    } catch (err) {
        throw new Error(err)
    }
}

// Local Functions
function _createProd(title) {
    const newProd = {
        id: utilService.makeId(),
        title,
        isDone: false,
        color: '#000000',
        description: '',
        priority: 1
    }
    return newProd
}


// DEPRECATED

// const gGroups = [
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
//     }
// ]

// async function removeProdFromGroup(groupId, prodId) {
//     try {
//         const groupRef = doc(db, 'group', groupId)
//         const groupSnapshot = await getDoc(groupRef)
//         const group = groupSnapshot.data()
//         group.products = group.products.filter(prod => prod.id !== prodId)

//     } catch (err) {
//         console.error(err)
//     }
//     console.log('gGroups', gGroups);
// }
