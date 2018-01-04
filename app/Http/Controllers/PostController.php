<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id = null) {

        if ($id === null) {

            return response()->json([
                'status' => 1,
                'posts' => Post::all()
            ]);

        } else {
            $post = Post::find($id);

            if ($post) {

                return response()->json([
                    'status' => 1,
                    'post' => $post
                ]);

            } else {

                return response()->json([
                    'status' => 0,
                    'message' => 'No post with given id'
                ]);

            }


        }

    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
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

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // validate
        $rules = array(
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
            $post = Post::find($id);
            $post->title = $input['title'];
            $post->content = $input['content'];

            if($post->save()) {

                return response()->json([
                    'status' => '1',
                    'message' => 'Post edited'
                ]);

            } else {

                return response()->json([
                    'status' => '0',
                    'message' => 'Post not edited'
                ]);

            }
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // delete
        $post = Post::find($id);
        $post->delete();

        // response
        return response()->json([
            'status' => '1',
            'message' => 'Post deleted'
        ]);
    }
}
