import * as types from '../mutation-types'
import * as urls from '../api/apiUrls'

const state = {
    // Posts
    posts: [],
    posts_message: "",
    posts_status : -1,
    filter : "",
    // Modals
    showAdd : false,
    showEdit : false,
    postEditId : 0,
    // PostAdd
    newPost : {
        title : "",
        content : ""
    },
    postAdd_status : -1,
    postAdd_message : "",
    // PostEdit
    postToEdit : {},
    editPost : {
        title: "",
        content: ""
    },
    postEdit_status : -1,
    postEdit_message : "",
}

const getters = {

    posts(state) {
        return state.posts;
    },

    message(state) {
        return state.posts_message;
    },

    status(state) {
        return state.posts_status;
    },

    filter(state) {
        return state.filter;
    },

    filteredPosts(state) {
        return state.posts.filter(function (all) {
            return all.title.toLowerCase().indexOf(state.filter.toLowerCase()) >= 0;
        });
    },

    showAdd(state) {
        return state.showAdd;
    },

    showEdit(state) {
        return state.showEdit;
    },

    postEditId(state) {
        return state.postEditId;
    },

    newPost(state) {
        return state.newPost;
    },

    newPostTitle(state) {
        return state.newPost.title;
    },

    newPostContent(state) {
        return state.newPost.content;
    },

    postAdd_status(state) {
        return state.postAdd_status;
    },

    postAdd_message(state) {
        return state.postAdd_message;
    },

    postToEdit(state) {
        return state.postToEdit;
    },

    editPost(state) {
        return state.editPost;
    },

    editPostTitle(state) {
        return state.editPost.title;
    },

    editPostContent(state) {
        return state.editPost.content;
    },

    postEdit_status(state) {
        return state.postEdit_status;
    },

    postEdit_message(state) {
        return state.postEdit_message;
    },

}

const mutations = {

    [types.SET_POSTS] (state, posts) {
        state.posts = posts;
    },

    [types.SET_POSTS_MESSAGE] (state, posts_message) {
        state.posts_message = posts_message;
    },

    [types.SET_POSTS_STATUS] (state, posts_status) {
        state.posts_status = posts_status;
    },

    [types.SET_POSTS_FILTER] (state, filter) {
        state.filter = filter;
    },

    [types.SET_POSTS_SHOW_ADD] (state, showAdd) {
        state.showAdd = showAdd;
    },

    [types.SET_POSTS_SHOW_EDIT] (state, showEdit) {
        state.showEdit = showEdit;
    },

    [types.SET_POSTS_POST_EDIT_ID] (state, postEditId) {
        state.postEditId = postEditId;
    },

    [types.SET_NEW_POST] (state, newPost) {
        state.newPost = newPost;
    },

    [types.SET_NEW_POST_TITLE] (state, title) {
        state.newPost.title = title;
    },

    [types.SET_NEW_POST_CONTENT] (state, content) {
        state.newPost.content = content;
    },

    [types.SET_POSTADD_MESSAGE] (state, postAdd_message) {
        state.postAdd_message = postAdd_message;
    },

    [types.SET_POSTADD_STATUS] (state, postAdd_status) {
        state.postAdd_status = postAdd_status;
    },

    [types.SET_EDIT_POST] (state, newPost) {
        state.editPost = newPost;
    },

    [types.SET_EDIT_POST_TITLE] (state, title) {
        state.editPost.title = title;
    },

    [types.SET_EDIT_POST_CONTENT] (state, content) {
        state.editPost.content = content;
    },

    [types.SET_POSTEDIT_MESSAGE] (state, postEdit_message) {
        state.postEdit_message = postEdit_message;
    },

    [types.SET_POSTEDIT_STATUS] (state, postEdit_status) {
        state.postEdit_status = postEdit_status;
    },


}

const actions = {
    getPosts ({ commit, state }) {
        axios.get(urls.API_POSTS_URL).then( response => {
            let data = response.data;
            if (data.hasOwnProperty('posts')) {
                commit(types.SET_POSTS, response.data.posts);
            }
            if (data.hasOwnProperty('message')) {
                commit(types.SET_POSTS_MESSAGE, response.data.message);
            }
            if (data.hasOwnProperty('status')) {
                commit(types.SET_POSTS_STATUS, parseInt(response.data.status));
            }

        }).catch( err => {
            commit(types.SET_POSTS, "Błąd pobrania postów!")
            commit(types.SET_POSTS, 0)
        })
    },

    setFilter ({ commit }, filter) {
        commit(types.SET_POSTS_FILTER, filter);
    },

    setNewPostTitle ({ commit }, title) {
        commit(types.SET_NEW_POST_TITLE, title);
    },

    setNewPostContent ({ commit }, content) {
        commit(types.SET_NEW_POST_CONTENT, content);
    },

    showModalAdd: function({ commit }) {
        commit(types.SET_POSTS_SHOW_ADD, true);
    },

    closeModalAdd: function({ commit }) {
        commit(types.SET_POSTS_SHOW_ADD, false);

        commit(types.SET_POSTADD_MESSAGE, "");
        commit(types.SET_POSTADD_STATUS, -1);
    },

    showModalEdit: function({ commit }, id) {
        commit(types.SET_POSTS_POST_EDIT_ID, id);
        commit(types.SET_POSTS_SHOW_EDIT, true);
    },

    closeModalEdit: function({ commit }) {
        commit(types.SET_POSTS_SHOW_EDIT, false);

        commit(types.SET_POSTEDIT_MESSAGE, "");
        commit(types.SET_POSTEDIT_STATUS, -1);
    },

    beforeNewPost: function({ commit, state, dispatch }) {
        if ((state.newPost.title.length > 0) && (state.newPost.content.length > 0)) {
            dispatch('addNewPost');
        } else {
            commit(types.SET_POSTADD_MESSAGE, "Oba pola muszą być wypełnione!");
            commit(types.SET_POSTADD_STATUS, 0);
        }
    },

    addNewPost: function({ state, commit, dispatch }) {
        axios.post(urls.API_POSTS_ADD_URL, state.newPost).then( response => {
            let data = response.data;
            if (data.hasOwnProperty('message')) {
                commit(types.SET_POSTADD_MESSAGE, data.message);
            }
            if (data.hasOwnProperty('status')) {
                commit(types.SET_POSTADD_STATUS, parseInt(data.status));
            }
            dispatch('clearForm');
            dispatch('getPosts');
        }).catch(err => {
            if (err.response) {
                commit(types.SET_POSTADD_MESSAGE, "Błąd podczas dodawania nowego postu!");
                commit(types.SET_POSTADD_STATUS, 0);
            }
        });
    },

    clearForm({ commit }) {
        commit(types.SET_NEW_POST_CONTENT, "");
        commit(types.SET_NEW_POST_TITLE, "");
    },

    getPostToEdit: function({ state, commit, dispatch }, id) {
        axios.get(urls.API_POSTS_GET_TO_EDIT_URL+id).then( response => {
            let data = response.data;
            if (data.hasOwnProperty('post')) {
                commit('SET_EDIT_POST', data.post);
                dispatch('setEditPostTitle', data.post.title);
                dispatch('setEditPostContent', data.post.content);
            }
            console.log('getPostToEdit success')
        }).catch( err => {
            if (err.response) {
                console.log('getPostToEdit error')
            }
        })
    },

    setEditPostTitle ({ commit }, title) {
        commit(types.SET_EDIT_POST_TITLE, title);
    },

    setEditPostContent ({ commit }, content) {
        commit(types.SET_EDIT_POST_CONTENT, content);
    },

    beforeEditPost: function({ commit, state, dispatch }, id) {
        if ((state.editPost.title.length > 0) && (state.editPost.content.length > 0)) {
            dispatch('editPost', id);
        } else {
            commit(types.SET_POSTEDIT_MESSAGE, "Oba pola muszą być wypełnione!");
            commit(types.SET_POSTEDIT_STATUS, 0);
        }
    },

    editPost: function({ state, commit, dispatch }, id) {
        axios.put(urls.API_POSTS_EDIT_URL+id, state.editPost).then( response => {
            let data = response.data;
            if (data.hasOwnProperty('message')) {
                commit(types.SET_POSTEDIT_MESSAGE, data.message);
            }
            if (data.hasOwnProperty('status')) {
                commit(types.SET_POSTEDIT_STATUS, parseInt(data.status));
            }
            dispatch('getPosts');
        }).catch(err => {
            if (err.response) {
                commit(types.SET_POSTEDIT_MESSAGE, "Błąd podczas dodawania nowego postu!");
                commit(types.SET_POSTEDIT_STATUS, 0);
            }
        });
    },

    deletePost: function({ state, commit, dispatch }, id) {
        axios.delete(urls.API_POSTS_DELETE_URL+id).then( response => {
            alert('Usunięto post o id ' + id);
        }).catch( err => {
            if(err.response) {
                alert('Błąd przy usuwaniu')
            }
        })
    },


}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}