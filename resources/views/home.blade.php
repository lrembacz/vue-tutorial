@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <posts :posts="posts"></posts>
    </div>
</div>
@endsection
