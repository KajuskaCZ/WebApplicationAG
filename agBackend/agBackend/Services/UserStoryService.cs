﻿using System.Collections.Generic;
using agBackend.Models;
using System;
using System.Linq;
using agBackend.Entities;
using agBackend.Helpers;

namespace agBackend.Services
{
    public interface IUserStoryService
    {
        IEnumerable<UserStoryModel> GetAllBySprint(int id);
        UserStoryModel Create(UserStoryCreateModel model);
    }

    public class UserStoryService : IUserStoryService
    {
        private DataContext _context;

        public UserStoryService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<UserStoryModel> GetAllBySprint(int id)
        {
            return _context.UserStories.Where(x => x.SprintId == id);
        }

        public UserStoryModel Create(UserStoryCreateModel model)
        {
            if (_context.Projects.Any(x => x.Name == model.Name))
            {
                throw new AppException("Name is already taken.");
            }

            UserStoryModel projectModel = new UserStoryModel { Name = model.Name, SprintId = model.SprintId };

            _context.UserStories.Add(projectModel);
            _context.SaveChanges();

            return projectModel;
        }
    }
}
