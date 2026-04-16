package com.dataeng.App.services;

import com.dataeng.App.model.entity.Tag;
import com.dataeng.App.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }

    public Optional<Tag> getTagByName(String name) {
        return tagRepository.findByName(name);
    }

    public List<Tag> searchTagsByName(String name) {
        return tagRepository.findByNameContaining(name);
    }

    public List<Tag> getMostUsedTags() {
        return tagRepository.findMostUsedTags();
    }

    public List<Tag> getTagsWithMinArticles(int minArticles) {
        return tagRepository.findByMinArticlesCount(minArticles);
    }

    public long getArticleCountByTagId(Long tagId) {
        if (!tagRepository.existsById(tagId)) {
            throw new RuntimeException("Tag not found with id: " + tagId);
        }
        return tagRepository.countArticlesByTagId(tagId);
    }

    public Tag createTag(Tag tag) {
        if (tagRepository.existsByName(tag.getName())) {
            throw new RuntimeException("Tag name already exists: " + tag.getName());
        }
        return tagRepository.save(tag);
    }

    public Tag updateTag(Long id, Tag tagDetails) {
        Optional<Tag> existingTag = tagRepository.findById(id);
        if (existingTag.isEmpty()) {
            throw new RuntimeException("Tag not found with id: " + id);
        }

        Tag tag = existingTag.get();

        if (!tag.getName().equals(tagDetails.getName()) && 
            tagRepository.existsByName(tagDetails.getName())) {
            throw new RuntimeException("Tag name already exists: " + tagDetails.getName());
        }

        tag.setName(tagDetails.getName());
        tag.setDescription(tagDetails.getDescription());

        return tagRepository.save(tag);
    }

    public void deleteTag(Long id) {
        if (!tagRepository.existsById(id)) {
            throw new RuntimeException("Tag not found with id: " + id);
        }
        tagRepository.deleteById(id);
    }

    public boolean existsByName(String name) {
        return tagRepository.existsByName(name);
    }
}
