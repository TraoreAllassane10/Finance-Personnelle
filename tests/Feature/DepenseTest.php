<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Tests\TestCase;
use App\Models\User;
use App\Models\Depense;
use App\Models\Category;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DepenseTest extends TestCase
{
    use RefreshDatabase;

    public function test_depense_stocked(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $this->actingAs($user)
            ->post('depenses', [
                'date' => Carbon::today(),
                'montant' => 200000,
                'category_id' => $category->id,
                'description' => "La description de ce revenu",
                'user_id' => $user->id
            ]);

        $this->assertCount(1, Depense::all());
    }

    public function test_depense_updated(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $this->actingAs($user)
            ->post('depenses', [
                'date' => Carbon::today(),
                'montant' => 200000,
                'category_id' => $category->id,
                'description' => "La description de depense",
                'user_id' => $user->id
            ]);

        $depense = Depense::first();

        $this->actingAs($user)
                ->put('/depenses/' . $depense->id, [
                'date' => Carbon::tomorrow(),
                'montant' => 300000,
                'category_id' => $category->id,
                'description' => "La description de depense",
                'user_id' => $user->id
            ]);

        $this->assertEquals(Carbon::tomorrow(), Depense::first()->date);
        $this->assertEquals(300000, Depense::first()->montant);
    }

    public function test_depense_destroyed(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $this->actingAs($user)
            ->post('depenses', [
                'date' => Carbon::tomorrow(),
                'montant' => 300000,
                'category_id' => $category->id,
                'description' => "La description de ce revenu",
                'user_id' => $user->id
            ]);


        $depense = Depense::first();

        $this->delete('/depenses/' . $depense->id);

        $this->assertCount(0, Depense::all());
    }
}
