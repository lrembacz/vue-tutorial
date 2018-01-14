<template>
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">

                <!-- Branding Image -->
                <a class="navbar-brand" href="/">
                    {{ appName }}
                </a>
            </div>

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
                    &nbsp;
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav navbar-right">
                    <li v-if="isAuth"><router-link :to="{ path: '/posts' }">Posts</router-link></li>
                    <li  v-if="isAuth" class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
                            User <span class="caret"></span>
                        </a>

                        <ul class="dropdown-menu">
                            <li>
                                <a href="/logout"
                                   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    Logout
                                </a>

                                <form id="logout-form" action="/logout" method="POST" style="display: none;">
                                    <input type="hidden" id="_token" name="_token" :value="token">
                                </form>
                            </li>
                        </ul>
                    </li>
                    <li v-if="!isAuth"><a href="/login">Login</a></li>
                    <li v-if="!isAuth"><a href="/register">Register</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { routes } from '../../router/routes'

    export default {
        data() {
            return {
                links : routes,
                token : $('meta[name="csrf-token"]').attr('content'),
            }

        },
        props : [
            'appName',
            'isAuth'
        ]
    }
</script>

<style scoped>

</style>