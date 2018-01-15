<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Login</div>

                    <div class="panel-body">
                        <form class="form-horizontal" @submit.prevent="login()" method="POST" action="/login">
                            <input type="hidden" name="_token" :value="token">

                            <div class="form-group">
                                <label for="email" class="col-md-4 control-label">E-Mail</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" v-model="email" required autofocus>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password" class="col-md-4 control-label">Hasło</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" v-model="password" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-8 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary">
                                        Zaloguj
                                    </button>

                                    <!--<a class="btn btn-link" href="{{ route('password.request') }}">-->
                                        <!--Forgot Your Password?-->
                                    <!--</a>-->
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { routes } from '../../router/routes'
    import {CLIENT_ID, CLIENT_SECRET} from "../../config/env";

    export default {
        data() {
            return {
                email : "",
                password: "",
                token : $('meta[name="csrf-token"]').attr('content'),
            }

        },
        methods: {
            login() {
                const postData = {
                    grant_type : "password",
                    client_id : CLIENT_ID,
                    client_secret : CLIENT_SECRET,
                    username : this.email,
                    password : this.password,
                    scope : ''
                };

                axios.post('/oauth/token', postData).then( response => {
                    console.log(response);

                    const token = response.data.access_token;

                    const header = {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token
                    };

                    axios.get('/api/user',
                        {
                            headers : header
                        }
                    ).then( response => {
                        console.log(response);

                        axios.get('/api/user',
                            {
                                headers : header
                            }
                        ).then( response => {
                            console.log(response);
                        });
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>