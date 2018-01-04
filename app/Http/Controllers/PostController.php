<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    public function show() {
        return Post::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        // validate
        $rules = array(
            'user_id' => 'required',
            'title' => 'required',
            'content' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        // process the login
        if ($validator->fails()) {
            return response()->json([
                'status' => '0',
                'message' => 'Post validation failed',
                'validator' => $validator
            ]);
        } else {

            // request to input
            $input = $request->all();

            // store
            $post = new Post;
            $post->user_id = $input['user_id'];
            $post->title = $input['title'];
            $post->content = $input['content'];

            if($post->save()) {

                return response()->json([
                    'status' => '1',
                    'message' => 'Post added'
                ]);

            } else {

                return response()->json([
                    'status' => '0',
                    'message' => 'Post not added'
                ]);

            }
        }
    }
}
