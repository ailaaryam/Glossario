<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSectionRequest;
use App\Http\Requests\UpdateSectionRequest;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        return response()->json(Section::all());
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
    public function store(Request $request){
        $section = Section::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Section criada com sucesso',
            'section' => $section
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Section $section)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id){
        $section = Section::findOrFail($id);

        $section->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Section atualizada com sucesso',
            'section' => $section
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id){
        $section = Section::findOrFail($id);
        $section->delete();

        return response()->json([
            'message' => 'Section removida com sucesso'
        ]);
    }
}
