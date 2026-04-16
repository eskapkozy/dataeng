package com.dataeng.App.controller;

import com.dataeng.App.model.entity.Tag;
import com.dataeng.App.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        return ResponseEntity.ok(tags);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable Long id) {
        Optional<Tag> tag = tagService.getTagById(id);
        return tag.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Tag> getTagByName(@PathVariable String name) {
        Optional<Tag> tag = tagService.getTagByName(name);
        return tag.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Tag>> searchTagsByName(@RequestParam String name) {
        List<Tag> tags = tagService.searchTagsByName(name);
        return ResponseEntity.ok(tags);
    }

    @GetMapping("/most-used")
    public ResponseEntity<List<Tag>> getMostUsedTags() {
        List<Tag> tags = tagService.getMostUsedTags();
        return ResponseEntity.ok(tags);
    }

    @GetMapping("/min-articles/{minArticles}")
    public ResponseEntity<List<Tag>> getTagsWithMinArticles(@PathVariable int minArticles) {
        List<Tag> tags = tagService.getTagsWithMinArticles(minArticles);
        return ResponseEntity.ok(tags);
    }

    @GetMapping("/{tagId}/article-count")
    public ResponseEntity<Long> getArticleCountByTagId(@PathVariable Long tagId) {
        try {
            long count = tagService.getArticleCountByTagId(tagId);
            return ResponseEntity.ok(count);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Tag> createTag(@RequestBody Tag tag) {
        try {
            Tag savedTag = tagService.createTag(tag);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTag);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tag> updateTag(@PathVariable Long id, @RequestBody Tag tagDetails) {
        try {
            Tag updatedTag = tagService.updateTag(id, tagDetails);
            return ResponseEntity.ok(updatedTag);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Tag not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        try {
            tagService.deleteTag(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/exists/name/{name}")
    public ResponseEntity<Boolean> checkTagNameExists(@PathVariable String name) {
        boolean exists = tagService.existsByName(name);
        return ResponseEntity.ok(exists);
    }
}
