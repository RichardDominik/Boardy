<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Http\Requests\Comment\DestroyComment;
use App\Http\Requests\Comment\StoreComment;
use App\Http\Resources\Comment as CommentResource;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function store(StoreComment $request): JsonResponse {
        $sanitized = $request->getSanitized();
        $comment = Comment::create($sanitized);

        return (new CommentResource($comment))
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(DestroyComment $request, int $id): JsonResponse {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(null, 204);
    }
}
