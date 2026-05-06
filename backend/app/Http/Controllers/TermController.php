<?php

namespace App\Http\Controllers;

use App\Models\Term;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTermRequest;
use App\Http\Requests\UpdateTermRequest;

class TermController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        return response()->json(
            Term::with(['section', 'admin'])->get()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $audioPath = null;

    // se for upload de arquivo
    if ($request->hasFile('audio_file')) {
        $audioPath = $request->file('audio_file')->store('audios', 'public');
    }

    // se for link
    if ($request->audio_url) {
        $audioPath = $request->audio_url;
    }

    $term = Term::create([
        'term' => $request->term,
        'definition' => $request->definition,
        'example' => $request->example,
        'section_id' => $request->section_id,
        'created_by' => $request->created_by,
        'audio' => $audioPath,
    ]);

    return response()->json($term);
}

    /**
     * Display the specified resource.
     */
    public function show(Term $term)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Term $term)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id){
        $term = Term::findOrFail($id);

        $term->update([
            'term' => $request->term,
            'definition' => $request->definition,
            'example' => $request->example,
            'section_id' => $request->section_id,
        ]);

        return response()->json([
            'message' => 'Termo atualizado com sucesso',
            'term' => $term
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id){
        $term = Term::findOrFail($id);
        $term->delete();

        return response()->json([
            'message' => 'Termo removido com sucesso'
        ]);
    }
}
